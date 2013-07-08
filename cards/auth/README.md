Glazier StackOverflow auth card
===============================

## Adding to glazier

    # in `glazier/cards/`
    ln -s your/path/to/glazier-stackoverflow/cards/auth stackoverflow-auth

    # in `glazier/`
    grunt ingestCards

    # in `glazier/glazier-server/`
    bundle exec rails console

    # lookup the CardManifest record
    cm = CardManifest.where(name: 'yapplabs/stackoverflow-auth').first

    # create a Pane record
    pane = Pane.new
    pane.card_manifest_name = cm.name
    pane.save

    # add the Pane to the dashboard of your choosing
    db = Dashboard.where(repository: 'yapplabs/glazier').first
    db.panes.push(pane)
